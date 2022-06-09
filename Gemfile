# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

gem "jbuilder"
gem "puma", "~> 5.0"
gem "rack-cors"
gem "rails", "~> 7.0.3"
gem "redis", "~> 4.0"
gem "sqlite3", "~> 1.4"

group :development, :test do
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "guard-rspec"
  gem "rspec-its"
  gem "rspec-json_matchers"
  gem "rspec_junit_formatter"
  gem "rspec-rails"
  gem "rubocop-rails"
  gem "rubocop-rspec"
  gem "shoulda-matchers"
  gem "simplecov"
end
