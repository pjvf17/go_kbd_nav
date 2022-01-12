# From https://gist.github.com/mihow/9c7f559807069a03e302605691f85572

# Local .env
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    # echo $KAGGLE_KEY
fi

web-ext sign --api-key $USER --api-secret $SECRET --source-dir ./dist/prod