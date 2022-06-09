# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require "spec_helper"
ENV["RAILS_ENV"] ||= "test"

require "simplecov"
SimpleCov.start :rails do
  add_filter "lib/crypto.rb"
end

require_relative "../config/environment"

# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

ActiveRecord::Migration.maintain_test_schema!

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.fixture_path = Rails.root.join("spec/fixtures").to_s
  config.global_fixtures = :all
  config.use_transactional_fixtures = true
  config.use_transactional_examples = true

  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!
end

def call_api(verb, path, payload: {}, headers: {})
  payload = payload.to_json if %w[post patch put].include? verb.to_s.downcase
  headers.reverse_merge! \
    Accept: "application/json",
    "Content-Type": "application/json",
    "Election-Slug": "test1"

  public_send(verb, path, params: payload, headers:)
end
