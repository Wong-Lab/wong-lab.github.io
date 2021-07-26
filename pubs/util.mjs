import fs from 'fs'
import yaml from 'js-yaml'

export const loadYAML = path => new Promise((res, rej) => {
  fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
    (err) ? rej(err) : res(yaml.load(data))
  })
})
