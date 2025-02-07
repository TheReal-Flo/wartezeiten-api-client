# Wartezeiten API Client

A Node.js client for the [Wartezeiten.APP / Waitingtimes.APP API](https://api.wartezeiten.app), written in TypeScript. This library provides a type-safe and easy-to-use interface to retrieve data about theme parks, their opening times, and current waiting times (queue times) for attractions.

## Features

- **Get Theme Parks**: Retrieve a list of available theme parks.
- **Get Opening Times**: Retrieve opening times for a specified theme park.
- **Get Waiting Times**: Retrieve current queue times (waiting times) for attractions.

## Installation

Install the package via npm:

```bash
npm install wartezeiten-api-client
```

## Usage

Below is an example of how to get started with the API client:

```typescript
import WartezeitenAPIClient from "wartezeiten-api-client";

async function main() {
  // Create an instance of the API client.
  const apiClient = new WartezeitenAPIClient();

  try {
    // Retrieve the list of parks with the language set to English.
    const parks = await apiClient.getParks({ language: "en" });
    console.log("Parks:", parks);

    // Retrieve opening times for a specific park (e.g., "altontowers").
    const openingtimes = await apiClient.getOpeningtimes({
      park: "altontowers",
    });
    console.log("Opening Times:", openingtimes);

    // Retrieve current waiting times for the park, with the language set to English.
    const waitingtimes = await apiClient.getWaitingtimes({
      park: "altontowers",
      language: "en",
    });
    console.log("Waiting Times:", waitingtimes);
  } catch (error) {
    console.error("API Error:", error);
  }
}

main();
```

## API Methods

The client exposes the following methods:

- **getParks(headers: ParksRequestHeaders): Promise\<Park[]\>**  
  Retrieves a list of theme parks.  
  _Headers required_:

  - `language`: `"de"` or `"en"`

- **getOpeningtimes(headers: OpeningtimesRequestHeaders): Promise\<OpeningTimes[]\>**  
  Retrieves opening times for a specified park.  
  _Headers required_:

  - `park`: The theme park id (e.g., `"altontowers"`)

- **getWaitingtimes(headers: WaitingTimesRequestHeaders): Promise\<WaitingTimes[]\>**  
  Retrieves current waiting (queue) times for a specified park.  
  _Headers required_:
  - `park`: The theme park id
  - `language`: `"de"` or `"en"`

## Configuration

By default, the client connects to the production API at `https://api.wartezeiten.app`. You can override the base URL by providing options when instantiating the client:

```typescript
const apiClient = new WartezeitenAPIClient({
  baseUrl: "https://api.wartezeiten.app", // or another custom URL
});
```

## Building the Project

This package is written in TypeScript. To compile the TypeScript code to JavaScript, run:

```bash
npm run build
```

This will output the compiled files into the `dist/` directory as configured in `tsconfig.json`.

## TypeScript Support

The API client is fully typed. Interfaces are provided for API endpoints, including request header types and response object types. You can directly import and use these types in your TypeScript projects if needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, feature requests, and issues are welcome! Feel free to open a new issue or submit a pull request if you'd like to contribute.

## Acknowledgments

- Thanks to the Wartezeiten.APP / Waitingtimes.APP team for providing a robust API.
- Thanks to the open source community for their continuous contributions and support.

```

---

This `README.md` provides a clear overview of the package, installation, usage, API methods, and configuration details. Adjust or expand the content as needed for your project's requirements.
```
