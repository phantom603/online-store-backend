export default class Stripe {
  get checkout() {
    return {
      sessions: {
        list: async () => {
          return {
            data: [
              {
                status: "complete",
                created: "now",
                metadata: {
                  "1": JSON.stringify({ id: 1, title: "title1" }),
                  "2": JSON.stringify({ id: 2, title: "title2" }),
                },
              },
            ],
          };
        },
      },
    };
  }
}
