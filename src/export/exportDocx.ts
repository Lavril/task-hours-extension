import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun
} from "docx"

import { saveAs } from "file-saver"

import type { MonthTable } from "../types/models"

export const exportMonthDocx =
  async (
    month: MonthTable,
    fullName: string
  ) => {
    const monthName =
      new Date(
        month.year,
        month.month
      ).toLocaleString("ru-RU", {
        month: "long"
      })

    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                "ФИО"
              )
            ]
          }),

          new TableCell({
            children: [
              new Paragraph(
                "Задача"
              )
            ]
          }),

          new TableCell({
            children: [
              new Paragraph(
                "Часы"
              )
            ]
          })
        ]
      })
    ]

    month.tasks.forEach((task) => {
      const fact =
        Object.values(
          task.days
        ).reduce(
          (acc, value) =>
            acc + value,
          0
        )

      rows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph(
                  fullName
                )
              ]
            }),

            new TableCell({
              children: [
                new Paragraph(
                  task.name
                )
              ]
            }),

            new TableCell({
              children: [
                new Paragraph(
                  String(fact)
                )
              ]
            })
          ]
        })
      )
    })

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Итоговый результат за ${monthName} ${month.year} года.`,
                  bold: true
                })
              ]
            }),

            new Paragraph(""),

            new Table({
              rows
            })
          ]
        }
      ]
    })

    const blob =
      await Packer.toBlob(doc)

    saveAs(
      blob,
      `report-${month.year}-${month.month + 1}.docx`
    )
  }