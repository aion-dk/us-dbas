# frozen_string_literal: true

class Openapi # rubocop:disable Metrics/ClassLength
  SUMMARY_NAMES = {
    index: "List",
    destroy: "Archive",
  }.freeze

  attr_accessor :schema, :example, :context

  def initialize
    @schema = initial_schema
  end

  def document(context:, example:)
    @context = context
    @example = example
    build_path_description
    build_response
    build_request if request_body.any?
    build_parameters
  end

  def write
    File.write Rails.root.join("public/schema.yml"), schema.deep_stringify_keys.to_yaml
  end

  private

  def build_parameters
    prms = context
           .request
           .parameters
           .except("controller", "action")

    schema.bury :paths, path, method, :parameters, parameter_hash(prms) if prms.any?
  end

  def parameter_hash(prms)
    prms.collect do |k, v|
      {
        name: k,
        in: :path,
        schema: to_json_schema(v),
      }
    end
  end

  def api_description
    file = Rails.root.join("public/api/description.md")
    file.exist? ? file.read : nil
  end

  def initial_schema
    {
      openapi: "3.1.0",
      info: {
        title: Rails.configuration.title,
        version: Rails.configuration.version,
        description: api_description,
      },
      tags: tag_descriptions.compact,
    }
  end

  def tag_descriptions
    Dir[Rails.root.join("public/api/*")].collect do |f|
      next unless Dir.exist? f

      {
        name: File.basename(f).classify,
        description: summary_description(f),
      }
    end
  end

  def summary_description(file)
    file = Pathname.new(file).join("description.md")
    return unless file.exist?

    Pathname.new(file).join("description.md").read.strip
  end

  def string_schema(string)
    number = string.to_i.to_s == string
    {
      type: number ? "number" : "string",
      example: number ? string.to_i : string,
    }
  end

  def to_json_schema(object)
    case object
    when Hash then object_schema(object)
    when Array then array_schema(object)
    when String then string_schema(object)
    else
      {
        type: object_type(object),
        example: object,
      }
    end
  end

  def array_schema(array)
    {
      type: "array",
      items: to_json_schema(array.first),
    }
  end

  def object_type(input)
    case input
    when Integer, Float then "number"
    when String then "string"
    when TrueClass, FalseClass then "boolean"
    else "object"
    end
  end

  def object_schema(object)
    object ||= {}
    {
      type: "object",
    }.tap do |h|
      h[:properties] ||= {}
      h[:required] ||= object.keys
      object.each do |k, v|
        h[:properties][k] = to_json_schema(v)
      end
    end
  end

  def build_request
    return if request_body.blank?

    schema.bury :paths, path, method, :requestBody, :required, !example.metadata[:optional_request_body]
    build_request_body
  end

  def build_request_body
    schema.bury \
      :paths,
      path,
      method,
      :requestBody,
      :content,
      request_media_type,
      :schema,
      to_json_schema(request_body)
  end

  def build_response # rubocop:disable Metrics/AbcSize
    schema.bury :paths, path, method, :responses, response_status, :description, example.description
    return if response_media_type.blank?

    schema.bury :paths, path, method, :responses, response_status, :content, response_media_type, :schema,
                to_json_schema(response_body)
  end

  def build_path_description # rubocop:disable Metrics/AbcSize
    schema.bury :paths, path, method, :tags, tags
    schema.bury :paths, path, method, :summary, summary
    schema.bury :paths, path, method, :description, description if description
    schema.bury :paths, path, method, :security, scopes if scopes.any?
  end

  def scopes
    arr = [example.metadata[:scopes]].flatten.compact
    return [] if arr.empty?
  end

  def description
    file = Rails.root.join("public/api/#{tags.first.underscore}/#{summary.downcase.gsub(/\ +/, '_')}.md")
    file.exist? ? file.read.strip : example.metadata[:desc].presence&.strip
  end

  def tags
    example.metadata[:tags] || [route.requirements[:controller].classify]
  end

  def summary
    example.metadata[:summary].presence ||
      SUMMARY_NAMES[route.requirements[:action].to_s.to_sym].presence ||
      route.requirements[:action].humanize.presence
  end

  def method
    context.request.method.to_s.downcase.to_sym
  end

  def response_media_type
    context.response.media_type
  end

  def request_media_type
    context.request.media_type
  end

  def response_status
    context.response.status
  end

  def request_body
    JSON.parse context.request.raw_post
  rescue JSON::ParserError
    {}
  end

  def response_body
    JSON.parse context.response.body
  rescue JSON::ParserError
    nil
  end

  def path
    route.path.spec.to_s.delete_suffix("(.:format)").to_sym
  end

  def route(app: Rails.application, fix_path: true, req: context.request) # rubocop:disable Metrics/AbcSize
    # Reverse the destructive modification by Rails https://github.com/rails/rails/blob/v6.0.3.4/actionpack/lib/action_dispatch/journey/router.rb#L33-L41
    if fix_path && !req.script_name.empty?
      req = req.dup
      req.path_info = File.join(req.script_name, req.path_info)
    end

    app.routes.router.recognize(req) do |route|
      route = find_rails_route(request: req, app: route.app.app, fix_path: false) unless route.path.anchored
      return route
    end
    raise "No route matched for #{req.request_method} #{req.path_info}"
  end
end

open_api = Openapi.new

RSpec.configure do |config|
  config.after :each, type: :request, openapi: true do |example|
    open_api.document context: self, example:
  end

  config.after :suite do
    open_api.write
  end
end
