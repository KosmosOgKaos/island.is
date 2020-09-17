import {
  buildDataProviderItem,
  buildExternalDataProvider,
  buildForm,
  buildMultiField,
  buildSection,
} from '../../../lib/formBuilders'
import {
  buildIntroductionField,
  buildRadioField,
  buildSelectField,
  buildTextField,
} from '../../../lib/fieldBuilders'
import { Form } from '../../../types/Form'
import { DataProviderTypes } from '../../../types/DataProvider'
import { ApplicationTypes } from '../../../types/ApplicationTypes'

const yesOption = { value: 'yes', label: 'Já' }
const noOption = { value: 'no', label: 'Nei' }

export const DrivingLessonsApplication: Form = buildForm({
  id: ApplicationTypes.DRIVING_LESSONS,
  ownerId: 'TODO?',
  name: 'Ökunám',
  children: [
    buildSection({
      id: 'student',
      name: 'Nemandi',
      children: [
        buildMultiField({
          id: 'student',
          name: 'Upplýsingar um nemanda',
          children: [
            buildTextField({
              id: 'student.name',
              name: 'Nafn nemandi',
              disabled: true,
            }),
            buildTextField({
              id: 'student.parentEmail',
              name: 'Netfang forráðamans',
              disabled: true,
            }),
            buildTextField({
              id: 'student.nationalId',
              name: 'Kennitala nemanda',
              disabled: true,
            }),
            buildTextField({
              id: 'student.phoneNumber',
              name: 'Símanúmer',
            }),
            buildTextField({ id: 'student.address', name: 'Heimilisfang' }),
            buildTextField({
              id: 'student.zipCode',
              name: 'Póstnúmer og staður',
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'type',
      name: 'Tegund ökunáms',
      children: [
        buildRadioField({
          id: 'type',
          name: 'Tegund ökunáms',
          options: [
            {
              value: 'B',
              label: 'Fólksbifreið (B)',
              tooltip:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
              value: 'AM',
              label: 'Léttbifhjól (AM)',
              tooltip:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
              value: 'A',
              label: 'Bifhjól (A)',
              tooltip:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
              value: 'A1',
              label: 'Bifhjól (A1)',
              tooltip:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
              value: 'A2',
              label: 'Bifhjól (A2)',
              tooltip:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
              value: 'T',
              label: 'Dráttarvél (T)',
              tooltip:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
          ],
        }),
        buildSelectField({
          id: 'teacher',
          name: 'Ökukennari',
          placeholder: 'Veldu ökukennara',
          options: [
            {
              label: 'Ingólfur Jónsson (101)',
              value: '1',
            },
            {
              label: 'Hallveig Traustadóttir (105)',
              value: '2',
            },
            {
              label: 'Björn Egilsson (107)',
              value: '3',
            },
            {
              label: 'Auður Egilsdóttir (170)',
              value: '4',
            },
          ],
        }),
        buildSelectField({
          id: 'school',
          name: 'Ökuskóli',
          placeholder: 'Veldu ökuskóla',
          options: [
            {
              label: 'Harvard',
              value: '1',
            },
            {
              label: 'Oxford',
              value: '2',
            },
          ],
        }),
      ],
    }),
    buildSection({
      id: 'health',
      name: 'Heilbrigðisupplýsingar',
      children: [
        buildMultiField({
          id: 'eyeSight',
          name: 'HeilbrigðisUpplýsingar',
          children: [
            buildRadioField({
              id: 'useGlasses',
              name: 'Notar þú gleraugu eða snertilinsur?',
              options: [yesOption, noOption],
            }),
            buildRadioField({
              id: 'damagedEyeSight',
              name: 'Hefur þú skerta sjón á öðru auga eða báðum?',
              options: [yesOption, noOption],
            }),
            buildRadioField({
              id: 'limitedFieldOfView',
              name: 'Hefur þú skert sjónsvið til annarrar hliðar eða beggja?',
              options: [yesOption, noOption],
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'fetchData',
      name: 'Sækja gögn',
      children: [
        buildExternalDataProvider({
          name: 'Sækja gögn',
          id: 'fetchData',
          dataProviders: [
            buildDataProviderItem({
              id: 'passportImgAndSignature',
              title: 'Passamynd og undirskrift',
              subTitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              type: DataProviderTypes.ExampleSucceeds,
            }),
            buildDataProviderItem({
              id: 'healthInfo',
              title: 'Gögn úr Heilsuveru',
              subTitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              type: DataProviderTypes.ExampleSucceeds,
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'payment',
      name: 'Greiðsla',
      children: [
        buildIntroductionField({
          id: 'payment',
          name: 'Ganga frá greiðslu',
          introduction: 'TODO IMPLEMENT',
        }),
      ],
    }),
    buildSection({
      id: 'confirmation',
      name: 'Staðfesta',
      children: [
        buildIntroductionField({
          id: 'overview',
          name: 'Hvað á eiginlega að koma hér?',
          introduction: 'TODO IMPLEMENT',
        }),
      ],
    }),
  ],
})
