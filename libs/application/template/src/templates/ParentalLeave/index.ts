import { ApplicationTemplate } from '../ApplicationTemplate'
import { ApplicationTypes } from '../../types/ApplicationTypes'
import {
  ApplicationContext,
  ApplicationStateSchema,
} from '../../types/StateMachine'
import * as z from 'zod'
import { ParentalLeaveForm } from './ParentalLeaveForm'

type Events =
  | { type: 'APPROVE' }
  | { type: 'REJECT' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }

export const ParentalLeave: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<Events>,
  Events
> = {
  type: ApplicationTypes.PARENTAL_LEAVE,
  dataProviders: [],
  dataSchema: z.object({
    approveExternalData: z.boolean().refine((v) => v === true),
    usage: z
      .number()
      .min(0)
      .max(6),
    spread: z.number().max(24),
    approveSpreadCalculations: z
      .boolean()
      .refine(
        (v) => v === true,
        'You must agree to these calculations to continue',
      ),
    periods: z.array(
      z.object({
        start: z.date(),
        end: z.date(),
        ratio: z
          .number()
          .min(1)
          .max(100),
      }),
    ),
  }),
  stateMachineConfig: {
    initial: 'draft',
    states: {
      draft: {
        meta: {
          name: 'draft',
          roles: [
            {
              id: 'applicant',
              form: ParentalLeaveForm,
              actions: [{ event: 'SUBMIT', name: 'Submit', type: 'primary' }],
              write: {
                answers: ['usage', 'spread', 'periods'],
                externalData: ['expectedDateOfBirth', 'salary'],
              },
            },
          ],
        },
        on: {
          SUBMIT: { target: 'employerApproval' },
        },
      },
      employerApproval: {
        meta: {
          name: 'Employer Approval',
          roles: [
            {
              id: 'employer',
              read: { answers: ['periods'] },
              actions: [
                { event: 'APPROVE', name: 'Approve', type: 'primary' },
                { event: 'REJECT', name: 'Reject', type: 'reject' },
              ],
            },
            {
              id: 'applicant',
              read: {
                answers: ['usage', 'spread', 'periods'],
                externalData: ['expectedDateOfBirth', 'salary'],
              },
            },
          ],
        },
        on: {
          APPROVE: { target: 'inReview' },
          ABORT: { target: 'draft' },
        },
      },
      inReview: {
        meta: {
          name: 'In Review',
        },
        on: {
          APPROVE: { target: 'approved' },
          REJECT: { target: 'draft' },
        },
      },
      approved: {
        meta: {
          name: 'Approved',
        },
        type: 'final' as const,
      },
      rejected: {
        meta: {
          name: 'Rejected',
        },
      },
    },
  },
}
