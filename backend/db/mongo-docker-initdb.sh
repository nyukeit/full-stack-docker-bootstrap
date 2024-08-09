set -e

mongosh <<EOF
use $MONGODB_DATABASE

db.createUser({
  user: '$MONGODB_USER',
  pwd: '$MONGODB_USER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGODB_DATABASE'
  }]
})
EOF

