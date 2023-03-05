FROM python:3.10-slim
# David Wentsch
RUN python -m pip install rasa[spacy]
RUN python -m spacy download de_core_news_lg

WORKDIR /app
COPY . .

RUN rasa train

ENTRYPOINT ["rasa"]

CMD ["run", "--enable-api", "--cors", "*", "--port", "5005"]
