# frozen_string_literal: true

require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
# require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
# require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
# require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rcs
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.title = "Result Ceremony Service (RCS)"
    config.version = Rails.root.join("VERSION").read.chomp
    config.redis_url = ENV.fetch "REDIS_URL", "redis://redis:6382"

    # Eager and autoload extra locations
    %w[lib].each do |string|
      path = Rails.root.join string
      config.eager_load_paths << path
      config.autoload_paths << path
    end

    config.cache_store = :redis_cache_store, { url: Rails.configuration.redis_url }
    config.action_controller.perform_caching = true

    # Log to STDOUT
    logger           = ActiveSupport::Logger.new($stdout)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
    config.log_tags = [:request_id]
  end
end
