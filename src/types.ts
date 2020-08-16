import type {JourneysOptions, LocationsOptions, TripOptions } from 'hafas-client';

export interface LocationsRequestParams {
    name: string;
    options: LocationsOptions;
}

export interface JourneysRequestParams {
    from: string;
    to: string;
    options: JourneysOptions;
}

export interface TripRequestParams {
    id: string;
    name: string;
    options: TripOptions;
}

