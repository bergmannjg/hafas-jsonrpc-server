# JSON-RPC server for hafas api

[JSON-RPC](https://www.jsonrpc.org/) server for the [hafas-client](https://www.npmjs.com/package/hafas-client) module in TypeScript.

The messages are transmitted via standard input/output streams.

Implemented with the [VSCode JSON RPC](https://www.npmjs.com/package/vscode-jsonrpc) module.

This work in progess.

## Program arguments

The program expects the profile (HAFAS endpoint) as the first argument, i.e. 'db' for Deutsche Bahn (DB)

```
node build/index.js db
```

## Profile Request

Get current profile.

*Request*:

* method: locations
* params: none

*Response*:

* result: [Profile](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a974df8111417398c9ae11b32e9a06a79da78197/types/hafas-client/index.d.ts#L23)

## Locations Request

*Request*:

* method: locations
* params: LocationsRequestParams defined [here](./src/types.ts)

*Response*:

* result: Array<[Station](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a974df8111417398c9ae11b32e9a06a79da78197/types/hafas-client/index.d.ts#L71) | [Stop](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a974df8111417398c9ae11b32e9a06a79da78197/types/hafas-client/index.d.ts#L96) | [Location](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a974df8111417398c9ae11b32e9a06a79da78197/types/hafas-client/index.d.ts#L38)>

## Journeys Request

*Request*:

* method: journeys
* params: LocationsRequestParams defined [here](./src/types.ts)

*Response*:

* result: [Journeys](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a974df8111417398c9ae11b32e9a06a79da78197/types/hafas-client/index.d.ts#L330)