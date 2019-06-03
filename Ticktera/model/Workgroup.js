class Workgroup{

    constructor(workers,billboard){
        this.workers = workers;
        this.billboard = billboard;
    }

    getWorkers(){
		return this.workers;
    }

    setWorkers(worker){
        this.workers.push(worker);
    }
    
}