import * as rpc from 'vscode-jsonrpc';
import createClient from 'hafas-client';
import type {LocationsRequestParams, JourneysRequestParams} from './types'

import bvgProfile = require('hafas-client/p/bvg');
import cflProfile = require('hafas-client/p/cfl');
import cmtaProfile = require('hafas-client/p/cmta');
import dbProfile = require('hafas-client/p/db');
import dbbusradarnrwProfile = require('hafas-client/p/db-busradar-nrw');
import hvvProfile = require('hafas-client/p/hvv');
import insaProfile = require('hafas-client/p/insa');
import invgProfile = require('hafas-client/p/invg');
import nahshProfile = require('hafas-client/p/nahsh');
import nvvProfile = require('hafas-client/p/nvv');
import oebbProfile = require('hafas-client/p/oebb');
import pkpProfile = require('hafas-client/p/pkp');
import rmvProfile = require('hafas-client/p/rmv');
import rsagProfile = require('hafas-client/p/rsag');
import saarfahrplanProfile = require('hafas-client/p/saarfahrplan');
import sbahnmuenchenProfile = require('hafas-client/p/sbahn-muenchen');
import sncbProfile = require('hafas-client/p/sncb');
import svvProfile = require('hafas-client/p/svv');
import vbbProfile = require('hafas-client/p/vbb');
import vbnProfile = require('hafas-client/p/vbn');
import vmtProfile = require('hafas-client/p/vmt');
import vsnProfile = require('hafas-client/p/vsn');

const choose = (p: string): createClient.Profile => {
    switch (p) {
        case 'bvg': return bvgProfile;
        case 'cfl': return cflProfile;
        case 'cmta': return cmtaProfile;
        case 'db': return dbProfile;
        case 'dbbusradarnrw': return dbbusradarnrwProfile;
        case 'hvv': return hvvProfile;
        case 'insa': return insaProfile;
        case 'invg': return invgProfile;
        case 'nahsh': return nahshProfile;
        case 'nvv': return nvvProfile;
        case 'oebb': return oebbProfile;
        case 'pkp': return pkpProfile;
        case 'rmv': return rmvProfile;
        case 'rsag': return rsagProfile;
        case 'saarfahrplan': return saarfahrplanProfile;
        case 'sbahnmuenchen': return sbahnmuenchenProfile;
        case 'sncb': return sncbProfile;
        case 'svv': return svvProfile;
        case 'vbb': return vbbProfile;
        case 'vbn': return vbnProfile;
        case 'vmt': return vmtProfile;
        case 'vsn': return vsnProfile;
        default: return dbProfile;
    }
};

function isLocationsRequest(req: any): req is LocationsRequestParams {
    return req && req.name && req.options;
}

function isJourneysRequest(req: any): req is JourneysRequestParams {
    return req && req.from && req.to && req.options;
}

const profile = process.argv.length > 2 ? choose(process.argv[2]) : dbProfile;
const client = createClient(profile, 'client')

let connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(process.stdin),
    new rpc.StreamMessageWriter(process.stdout));

connection.onRequest("profile", () => {
    return profile;
});

connection.onRequest("journeys", (params: any) => {
    if (isJourneysRequest(params)) {
        return client.journeys(params.from, params.to, params.options);
    }
    else {
        return new rpc.ResponseError(rpc.ErrorCodes.InvalidParams, "parameter 'from' and 'to' expected")
    }
});

connection.onRequest("locations", (params: any) => {
    if (isLocationsRequest(params)) {
        return client.locations(params.name, params.options);
    }
    else {
        return new rpc.ResponseError(rpc.ErrorCodes.InvalidParams, "parameter 'name' expected")
    }
});

connection.listen();
