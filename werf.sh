export $(cat $(dirname $0)/.werf/.env.$WERF_ENV | xargs)
werf $*
