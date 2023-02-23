## Change the USERNAME is here

FROM 534003348933.dkr.ecr.eu-west-1.amazonaws.com/ruby:3.2-dev-latest as builder

# Settings build argument that only lives in build time
ARG RAILS_ENV $RAILS_ENV
ARG BUNDLER_VERSION 2.4.6

# Environment variables that also start with the container
ENV RAILS_LOG_TO_STDOUT=true

WORKDIR /usr/src/app

# Bundle
RUN mkdir -p -m 0600 ~/.ssh \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN gem install bundler --version "$BUNDLER_VERSION"
COPY Gemfile Gemfile.lock ./
RUN --mount=type=ssh bundle install --jobs 4

FROM builder as development
# Copy the code in
COPY . .
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]

FROM 534003348933.dkr.ecr.eu-west-1.amazonaws.com/ruby:3.2-dev-latest as production

ARG SECRET_KEY_BASE
ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true

# Addings user and group used for running as non-root
RUN groupadd -r USERNAME && useradd --no-log-init -r -m -u 1000 -g USERNAME USERNAME
USER USERNAME

WORKDIR /usr/src/app

COPY --chown=USERNAME:USERNAME . .
COPY --from=builder --chown=USERNAME:USERNAME /usr/local/bundle /usr/local/bundle/

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]
