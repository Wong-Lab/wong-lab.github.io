import { promises as fs } from 'fs'
import { parse } from 'yaml'

export const loadYAML = async path =>
  parse(await fs.readFile(path, 'utf8'))