const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client){
    super();
    this.task = {};
    this.taskId = 1;
    process.nextTick(() => {
      this.emit(
        'response',
        'Type a command (help to list commands)'
      );
    });

    this.emit('response', 'Type a command (help to list commands)');
    client.on('command', (command, args) => {
      switch(command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
          this[command](args);
        break;
        default:
          this.emit('response', 'unknown command... ');
      }
    });
  }

  taskString() {
    return Object.keys(this.task).map(key => {
      return `${key}: ${this.task[key]}`;
    }).join('\n');
  }

  help() {
    this.emit('response', `Available COmmands:
  add task
  ls
  delete :id`
    );
  }

  add(args) {
    this.task[this.taskId] = args.join(' ');
    this.emit('response', `Added task ${this.taskId}`);
    this.taskId++;
  }

  ls() {
    this.emit('response', `Tasks:\n${this.taskString()}`);
  }

  delete(args) {
    delete(this.task[args[0]]);
    this.emit('response', `Deleted task ${args[0]}`);
  }
}

module.exports = (client) => new Server(client);