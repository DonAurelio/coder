export class Context {
  constructor( public rowdim: number, public coldim: number,public type: string, public generations: number, public nbhd_name: string) {
  
  }

  data(): Object {

    var neumann = {
      up: [-1,1],
      down: [1,1],
      left: [1,1],
      right: [-1,-1]
    }

    var moore = {
      left_up: [-1,-1],
      up: [-1,0],
      right_up: [-1,1],
      left: [0,-1],
      right: [0,1],
      left_down: [1,-1],
      down: [1,0],
      right_down: [1,1],
      center: [0,0]
    }

    var data = {
      lattice: {
        'rowdim': this.rowdim,
        'coldim': this.coldim,
        'type': this.type,
        'neighborhood': (this.nbhd_name == 'moore') ? moore : neumann,
      },
      generations: this.generations
    };

    return data;
  }

}