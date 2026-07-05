import { defineField, defineType } from "sanity";

export const consultationLead = defineType({
  name: "consultationLead",
  title: "咨询记录",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "姓名",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "手机号码",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "wechat",
      title: "微信号",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "所在城市",
      type: "string",
    }),
    defineField({
      name: "consultationNeed",
      title: "咨询需求",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactTime",
      title: "方便联系时间",
      type: "string",
      options: {
        list: [
          { title: "随时", value: "anytime" },
          { title: "上午 09:00–12:00", value: "morning" },
          { title: "下午 12:00–18:00", value: "afternoon" },
          { title: "晚上 18:00–21:00", value: "evening" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "来源页面",
      type: "string",
      description: "记录提交来自哪个页面，如：三代试管婴儿、试管服务区域",
      options: {
        list: [
          { title: "三代试管婴儿", value: "third-generation-ivf" },
          { title: "试管服务区域", value: "ivf-services" },
          { title: "走进天悦宝贝", value: "about-tianyue" },
          { title: "首页", value: "home" },
          { title: "其他", value: "other" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "处理状态",
      type: "string",
      options: {
        list: [
          { title: "待跟进", value: "pending" },
          { title: "跟进中", value: "in_progress" },
          { title: "已完成", value: "completed" },
          { title: "无效", value: "invalid" },
        ],
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "提交时间",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "提交时间（新到旧）",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "状态",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "phone",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare({ title, subtitle, status, submittedAt }) {
      const statusMap: Record<string, string> = {
        pending: "待跟进",
        in_progress: "跟进中",
        completed: "已完成",
        invalid: "无效",
      };
      const dateStr = submittedAt
        ? new Date(submittedAt).toLocaleDateString("zh-CN")
        : "";
      return {
        title: `${title || "未填写"} — ${subtitle || ""}`,
        subtitle: `[${statusMap[status] || status}] ${dateStr}`,
      };
    },
  },
});
