FROM 534003348933.dkr.ecr.eu-west-1.amazonaws.com/ruby:3.1-dev-latest

ARG BUNDLE_WITH="production"

RUN apt-get install -y \
  redis-tools \
  libsqlite3-dev

WORKDIR /usr/src/app

RUN gem install bundler

COPY Gemfile* .

RUN mkdir -p -m 0600 ~/.ssh \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN bundle config set \
    --local with 'production' \
    --jobs 4

RUN --mount=type=ssh bundle install

COPY . ./

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
