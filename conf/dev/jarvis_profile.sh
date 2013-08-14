# Developer functions and aliases

export J_DIR='/home/vagrant/jarvis'
export JARVIS_DEVELOP_PORT=9000

alias djmanage="djmanages dev_local"
alias djshell="djmanage shell_plus"
alias j="cd $J_DIR"
alias js="cd $J_DIR/src"
alias pcli="psql -d jarvis"
alias rs="djmanage runserver 0.0.0.0:$JARVIS_DEVELOP_PORT --nothreading"

# Alias to run ./manage.py <CMD> with a specified settings module as the first arg
function djmanages {
    pushd $J_DIR
    DJ_SETTINGS_FILE="jarvis.settings.$1"
    shift 1
    CMD="./manage.py $@"
    echo "($DJ_SETTINGS_FILE) $CMD"
    DJANGO_SETTINGS_MODULE="$DJ_SETTINGS_FILE" $CMD
    popd
}

# Alias to run djmanage schemamigration <app> <flags>
function schemamigration {
    CMD="schemamigration $1"
    shift 1
    djmanages dev_local "$CMD $@"
}

# Alias to run djmanage migrate <app> <flags>
function migrate {
    CMD="migrate $1"
    shift 1
    djmanages dev_local "$CMD $@"
}

# Shortcut for tailing logs in /var/log/jarvis/
function tail_log {
    tail -f "/var/log/jarvis/${1}.log"
}
