FROM ruby:3.1.4
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash - \
&& wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
&& apt-get update -qq \
&& apt-get install -y build-essential libpq-dev nodejs yarn
RUN mkdir /animalbingo_app2
WORKDIR /animalbingo_app2
RUN gem install bundler:2.3.17
COPY Gemfile /animalbingo_app2/Gemfile
COPY Gemfile.lock /animalbingo_app2/Gemfile.lock
COPY yarn.lock /animalbingo_app2/yarn.lock
RUN bundle install
RUN yarn install
COPY . /animalbingo_app2
