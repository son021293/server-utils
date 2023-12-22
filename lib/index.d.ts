type TInputUrl = {
    url: string;
    priority: number;
};
declare const findServer: (data: TInputUrl[]) => Promise<TInputUrl>;
export { findServer, TInputUrl };
