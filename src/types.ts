import type {JourneysOptions, LocationsOptions } from 'hafas-client';

export interface LocationsRequestParams {
    name: string;
    options: LocationsOptions;
}

export interface JourneysRequestParams {
    from: string;
    to: string;
    options: JourneysOptions;
}

