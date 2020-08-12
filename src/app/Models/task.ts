export class Task{
    constructor(
        public id: string,
        public taskName: string,
        public taskDesc: string,
        public progress: number,
        public taskdate: any){}
}