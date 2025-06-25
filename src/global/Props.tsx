export interface AuthContextType {
    taskList:Array<PropCard>,
    onOpen:void,
	handleEdit:Function,
	handleDelete:Function,
	taskListBackup:Array<PropCard>,
	filter: (t: string) => void
}
export type PropCard = {
    description: string, 
	flag:PropFlags,
	item: number, 
	timeLimit:string,
	title: string,
	dateFinal?: string // nova propriedade opcional para data final
}

type PropFlags = '1 Por Dia'|'Cada 2h'|'Cada 4h'|'Cada 8h';