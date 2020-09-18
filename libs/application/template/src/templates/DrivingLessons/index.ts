import { ApplicationTemplate } from '../ApplicationTemplate'
import { ApplicationTypes } from '../../types/ApplicationTypes'
import {
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
} from '../../types/StateMachine'
import * as z from 'zod'
import { DrivingLessonsApplication } from './forms/DrivingLessonsApplication'
import { nationalIdRegex } from '../examples/constants'
import { ReviewApplication } from './forms/ReviewApplication'
import { Approved } from './forms/Approved'
import { Rejected } from './forms/Rejected'

type Events =
  | { type: 'APPROVE' }
  | { type: 'REJECT' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }

const dataSchema = z.object({
  passportPicture: z.any().optional(),
  school: z.string().nonempty(),
  teacher: z.string().nonempty(),
  type: z.enum(['B', 'AM', 'A', 'A1', 'A2', 'T']),
  student: z.object({
    name: z.string().nonempty(),
    parentEmail: z
      .string()
      .email()
      .nonempty(),
    nationalId: z.string().refine((x) => (x ? nationalIdRegex.test(x) : false)),
    phoneNumber: z.string().min(7),
    address: z.string().nonempty(),
    zipCode: z.string().nonempty(),
  }),
  approveExternalData: z.boolean().refine((v) => v === true),
  useGlasses: z.enum(['yes', 'no']),
  damagedEyeSight: z.enum(['yes', 'no']),
  limitedFieldOfView: z.enum(['yes', 'no']),
  approvedByReviewer: z.enum(['APPROVE', 'REJECT']),
})

export const DrivingLessons: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<Events>,
  Events
> = {
  type: ApplicationTypes.DRIVING_LESSONS,
  dataProviders: [],
  dataSchema,
  stateMachineConfig: {
    initial: 'draft',
    states: {
      draft: {
        meta: {
          name: 'Umsókn um ökunám',
          roles: [
            {
              id: 'applicant',
              form: DrivingLessonsApplication,
              actions: [
                { event: 'SUBMIT', name: 'Staðfesta', type: 'primary' },
              ],
              write: 'all',
            },
          ],
        },
        on: {
          SUBMIT: {
            target: 'inReview',
          },
        },
      },
      inReview: {
        meta: {
          name: 'In Review',
          roles: [
            {
              id: 'applicant', // TODO this should be reviewer
              form: ReviewApplication,
              actions: [
                { event: 'APPROVE', name: 'Samþykkja', type: 'primary' },
                { event: 'REJECT', name: 'Hafna', type: 'reject' },
              ],
              read: 'all',
            },
          ],
        },
        on: {
          APPROVE: { target: 'approved' },
          REJECT: { target: 'rejected' },
        },
      },
      approved: {
        meta: {
          name: 'Approved',
          roles: [{ id: 'applicant', form: Approved }],
        },
        type: 'final' as const,
      },
      rejected: {
        meta: {
          name: 'Rejected',
          roles: [{ id: 'applicant', form: Rejected }],
        },
      },
    },
  },
  mapNationalRegistryIdToRole(
    id: string,
    state: string,
  ): Promise<ApplicationRole> {
    if (state === 'inReview' && (id === '0811902249' || id === '2212902169')) {
      return Promise.resolve('reviewer')
    }
    return Promise.resolve('applicant')
  },
}
