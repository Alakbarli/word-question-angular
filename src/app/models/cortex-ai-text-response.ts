export interface CortexAiTextResponse {
    data: {
        outputs: [
          {
            index: number,
            text: string
          }
        ],
        remaining_credits:number
      },
      status: string
}
