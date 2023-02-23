# frozen_string_literal: true

class Hash
  # Written arround halloween, so I chose the spooky naming option here.
  # https://github.com/dam13n/ruby-bury/blob/master/hash.rb
  def bury(*args)
    raise ArgumentError, "2 or more arguments required" if args.count < 2

    if args.count == 2
      self[args[0]] = args[1]
    else
      arg = args.shift
      self[arg] = {} unless self[arg]
      self[arg].bury(*args) unless args.empty?
    end

    self
  end

  # Deeply compacts the array, removing all emptyish values. E.g. `{}`, `[]`,
  # and `nil` all gets removed.
  #
  # Example:
  #   { a: { b: nil } }.deep_compact # => {}
  #   { a: { b: {} } }.deep_compact # => {}
  #   { a: { b: [] } }.deep_compact # => {}
  def deep_compact
    transform_values do |vl|
      next if vl.respond_to?(:empty?) && vl.empty?

      vl.respond_to?(:deep_compact) ? vl.deep_compact : vl
    end.compact
  end
end
