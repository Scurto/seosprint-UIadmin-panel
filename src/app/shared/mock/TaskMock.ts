export class TaskMock {
    // myListYoutubeTasks = new BehaviorSubject<YoutubeTask[]>([ //REMOVE

    getListMockTasks() {
        return this.myListYoutubeTasks;
    }

    myListYoutubeTasks = [
        {
            taskId: '1',
            countVideo: '1',
            countReklama: '1',
            countMove: '1',
            reklamaFreeze: 45,
            videoFreeze: 45,
            strategy: 'classic'
        },
        {
            taskId: '2',
            countVideo: '0',
            countReklama: '0',
            countMove: '0',
            reklamaFreeze: 45,
            videoFreeze: 45,
            strategy: 'classic'
        },
        {
            taskId: '3',
            countVideo: '0',
            countReklama: '0',
            countMove: '0',
            reklamaFreeze: 45,
            videoFreeze: 45,
            strategy: 'classic'
        },
        {
            taskId: '4',
            countVideo: '0',
            countReklama: '0',
            countMove: '0',
            reklamaFreeze: 45,
            videoFreeze: 45,
            strategy: 'classic'
        }
    ];

    
}