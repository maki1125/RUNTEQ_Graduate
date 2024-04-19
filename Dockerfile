FROM ruby:3.1.4
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV RAILS_ENV=development
RUN mkdir /animalbingo_app2
WORKDIR /animalbingo_app2
RUN gem install bundler:2.3.17
COPY Gemfile /animalbingo_app2/Gemfile
COPY Gemfile.lock /animalbingo_app2/Gemfile.lock
COPY yarn.lock /animalbingo_app2/yarn.lock
RUN bundle install

COPY . /animalbingo_app2
