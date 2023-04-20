echo -n "you are running $0 type yes to continue: "
read -r answer
[ "$answer" != "yes" ] && exit

cat stocks.sql | sudo -u postgres psql cloudtreasury

