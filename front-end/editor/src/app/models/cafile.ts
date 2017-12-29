export class Cafile {
  constructor( public rowdim: number, public coldim: number,public type: string, public generations: number, public nbhd_name: string) {
  
  }

  getData(): Object {

    var neumann = {
      up: [-1,1],
      down: [1,1],
      left: [1,1],
      right: [-1,-1]
    }

    var moore = {
      up_left: [-1,-1],
      up: [-1,0],
      up_right: [-1,1],
      left: [0,-1],
      right: [0,1],
      down_left: [1,-1],
      down: [1,0],
      down_right: [1,1]
    }

    var data = {
      lattice: {
        'rowndim': this.rowdim,
        'coldim': this.coldim,
        'type': this.type,
        'neighborhood': (this.nbhd_name == 'moore') ? moore : neumann,
      },
      generations: this.generations
    };

    return data;
  }

}