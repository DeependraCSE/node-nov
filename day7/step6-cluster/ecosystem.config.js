module.exports = {
  apps : [{
    name : "myapp",
    script: 'without_cluster.js',
    instances : "-6",
    autorestart : false,
    watch: false,
    max_memory_restart : "1G"
  }]
};
