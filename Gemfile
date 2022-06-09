source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

gem "rails", "~> 7.0.3"
gem "sqlite3", "~> 1.4"
gem "puma", "~> 5.0"
gem "jbuilder"
gem "redis", "~> 4.0"
gem "rack-cors"

group :development, :test do
  gem "guard-rspec"
  gem "rspec-its"
  gem "rspec-json_matchers"
  gem "rspec_junit_formatter"
  gem "rspec-rails"
  gem "rubocop-rails"
  gem "rubocop-rspec"
  gem "shoulda-matchers"
  gem "simplecov"
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end
