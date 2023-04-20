echo -n "you are running $0 type yes to continue: "
read -r answer
[ "$answer" != "yes" ] && exit

cat data.sql | sudo -u postgres psql cloudtreasury

