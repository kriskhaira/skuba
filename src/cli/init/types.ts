/* eslint-disable new-cap */

import * as t from 'runtypes';

import { ProjectType } from '../../utils/manifest';

const INIT_CONFIG_INPUT_FIELDS = {
  destinationDir: t.String,
  templateComplete: t.Boolean,
  templateData: t
    .Record({
      ownerName: t.String,
      repoName: t.String,
    })
    .And(t.Dictionary(t.String, 'string')),
  templateName: t.String,
};

export type InitConfigInput = t.Static<typeof InitConfigInput>;

export const InitConfigInput = t.Record(INIT_CONFIG_INPUT_FIELDS);

export type InitConfig = t.Static<typeof InitConfig>;

const InitConfig = t.Record({
  ...INIT_CONFIG_INPUT_FIELDS,

  templateData: t
    .Record({
      ownerName: t.String,
      repoName: t.String,

      // Derived from ownerName
      orgName: t.String,
      teamName: t.String,
    })
    .And(t.Dictionary(t.String, 'string')),

  entryPoint: t.String.Or(t.Undefined),
  type: ProjectType.Or(t.Undefined),
});
