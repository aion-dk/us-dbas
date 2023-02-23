# frozen_string_literal: true

module RSpec
  module RequestSupport
    extend ActiveSupport::Concern

    included do
      # This is a method, and not a `let` to avoid it being cached
      def action
        formatted_params = if %w[POST PATCH PUT].include? http_verb.to_s.upcase
                             params.to_json
                           else
                             params
                           end
        public_send http_verb.to_s.downcase, url, params: formatted_params, headers:
      end

      let(:url) { "/" }
      let(:http_verb) { :GET }
      let(:params) { {} }
      let(:response_json) { JSON.parse response.body }
      let(:resource_ids) { response_json.fetch("data").map { |j| j.fetch("id") } }
      let(:scopes) { %i[admin] }
      let(:headers) do
        {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        }
      end
    end
  end
end

RSpec.configure do |config|
  config.include RSpec::RequestSupport, type: :request
end
