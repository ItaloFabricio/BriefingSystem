export type Briefing = {
    id: number;
    clientName: string;
    description: string;
    dateTime: string;
    state: 'negociacao' | 'finalizado' | 'aprovado';
}