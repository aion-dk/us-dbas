# frozen_string_literal: true

# This will include matcher methods globally for all spec
# You can choose to include it conditionally, but you should decide yourself
# Or just ignore this comment if you are just trying this out
RSpec.configure do |config|
  config.include RSpec::JsonMatchers::Matchers
end
