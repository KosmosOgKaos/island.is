import { readFileSync } from 'fs'
import glob from 'glob'
import { execFileSync } from 'child_process'
import { createClient } from 'contentful-management'
import { Collection } from 'contentful-management/dist/typings/common-types'
import {
  Locale,
  LocaleProps,
} from 'contentful-management/dist/typings/entities/locale'
import { Entry } from 'contentful-management/dist/typings/entities/entry'

export interface Message {
  defaultMessage: string
  description: string
}

export interface MessageDict {
  [key: string]: Message
}

const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
const space = process.env.CONTENTFUL_SPACE

if (!space || !accessToken) {
  throw new Error(
    'Missing Contentful environment variables: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN or CONTENTFUL_SPACE',
  )
}

const client = createClient({
  accessToken,
})

execFileSync('npx', [
  'formatjs',
  'extract',
  '--out-file',
  'libs/localization/messages.json',
  '--format',
  'libs/localization/scripts/formatter.js',
  process.argv[2],
])

function createNamespace(id: string, messages: MessageDict, locales: Locale[]) {
  const emptyObjForEachLocale = locales.reduce(
    (arr, curr) => ({
      ...arr,
      [curr.code]: {},
    }),
    {},
  )
  return client
    .getSpace(space)
    .then((space) => space.getEnvironment('master'))
    .then((environment) =>
      environment.createEntryWithId('namespace', id, {
        fields: {
          namespace: {
            ['is-IS']: id,
          },
          defaults: {
            ['is-IS']: messages,
          },
          fallback: emptyObjForEachLocale,
          strings: emptyObjForEachLocale,
        },
      }),
    )
    .catch((err) => console.log(err))
}

function updateNamespace(namespace: Entry, messages: MessageDict) {
  namespace.fields.defaults['is-IS'] = Object.assign(
    {},
    namespace.fields.defaults['is-IS'],
    messages,
  )

  const newStrings = Object.keys(messages).reduce(
    (arr, cur) => ({ ...arr, [cur]: '' }),
    {},
  )

  namespace.fields.strings = Object.keys(namespace.fields.strings).reduce(
    (arr, cur) => ({
      ...arr,
      [cur]: Object.assign({}, newStrings, namespace.fields.strings[cur]),
    }),
    {},
  )

  return namespace
    .update()
    .then((namespace) => console.log('update namespace', namespace))
    .catch((err) => console.log(err))
}

function getNamespace(id: string) {
  return client
    .getSpace(space)
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.getEntry(id))
    .catch(() => null)
}

function getLocales() {
  return client
    .getSpace(space)
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.getLocales())
    .catch(() => [])
}

glob
  .sync('libs/localization/messages.json')
  .map((filename) => readFileSync(filename, 'utf8'))
  .map((file) => JSON.parse(file))
  .forEach((f) => {
    Object.entries<MessageDict>(f).forEach(
      async ([namespaceId, namespaceMessages]) => {
        const namespace = await getNamespace(namespaceId)
        const locales = (await getLocales()) as Collection<Locale, LocaleProps>

        // If namespace does exist we update it, else we create it
        if (namespace) {
          updateNamespace(namespace, namespaceMessages)
        } else {
          createNamespace(namespaceId, namespaceMessages, locales.items)
        }
      },
    )
  })
