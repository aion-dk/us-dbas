RSpec.shared_examples "http status" do |status: 200, openapi: {}|
  name = Rack::Utils::SYMBOL_TO_STATUS_CODE.invert[status]&.to_s&.humanize

  it("responds with #{status} #{name}", openapi:) do
    action
    expect(response.status).to eql status
  end
end
