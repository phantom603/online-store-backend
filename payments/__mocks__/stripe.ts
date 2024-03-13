export default class Stripe {
  constructor(key: string) {
    console.log("stripe mock constructor called with key: ", key);
  }

  get checkout() {
    console.log("checkout mock called");

    return {
      sessions: {
        list: async () => {
          console.log("retrieve mock called");

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
