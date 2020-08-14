export class Task{
    constructor(
        public task: string,
        public id: string,
        public taskdate: any,
        public details: string,
        public userid: string,
        public progress: number
        ){}
}