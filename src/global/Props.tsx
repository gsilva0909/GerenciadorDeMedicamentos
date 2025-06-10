interface AuthContextType {
    taskList:Array<PropCard>,
    onOpen:void,
	handleEdit:Function,
	handleDelete:Function,
	taskListBackup:Array<PropCard>,
	filter: (t: string) => void
}
type PropCard = {
    description: string, 
	flag:PropFlags,
	item: number, 
	timeLimit:string,
	title: string
}

// Define PropFlags conforme a frequência de uso do remédio
// 'aCada3h'     = tomar a cada 3 horas
// 'umaVezDia'   = tomar 1 vez ao dia
// 'duasVezesDia' = tomar 2 vezes ao dia
// 'usoContinuo' = uso contínuo, rotina
// 'opcional'    = pode ser pulado, suplemento
type PropFlags = 'cada3H' | 'cada1D' | 'duasVezesDia' | 'usoContinuo' | 'opcional';