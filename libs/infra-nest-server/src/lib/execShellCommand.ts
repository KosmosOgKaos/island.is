import { logger } from '@island.is/logging'
import { exec } from 'child_process'

export const execShellCommand = (cmd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log(stdout || stderr)
        resolve(stdout || stderr)
      }
    })
  })
