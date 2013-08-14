#/usr/bin/env bash

source ~/.bashrc

export EDITOR=vi

. python_venv/jarvis/bin/activate
. jarvis/conf/dev/jarvis_profile.sh

# Allow for personalization of the bash environment here.
if [ -s ~/.bash_aliases ]
then
    . ~/.bash_aliases
fi

## No need to use git inside vagrant, vagrant exists so you don't have
## to do your work in a VM.  This is just for safety in case anyone tries.
git config --global branch.master.rebase true
git config --global branch.autosetuprebase always
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
