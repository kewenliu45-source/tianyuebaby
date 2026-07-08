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
      description: "客户提交表单时填写的姓名，未填写时显示\"未填写\"。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "手机号码",
      type: "string",
      description: "客户提交表单时填写的联系电话，用于回访跟进。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "wechat",
      title: "微信号",
      type: "string",
      description: "客户选填的微信号，方便通过微信沟通。",
    }),
    defineField({
      name: "city",
      title: "所在城市",
      type: "string",
      description: "客户选填的所在城市，便于了解客户地域分布。",
    }),
    defineField({
      name: "consultationNeed",
      title: "咨询需求",
      type: "text",
      rows: 3,
      description: "客户填写的具体咨询内容，是跟进沟通的核心参考信息。",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactTime",
      title: "方便联系时间",
      type: "string",
      description: "客户选择的方便接听电话的时段，便于安排回访时间。",
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
      description: "系统自动记录的来源页面，只读不可手动修改。用于统计各页面的获客效果。",
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
      description: "跟进进度标记。新记录默认为\"待跟进\"，请在跟进后及时更新状态。",
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
      description: "系统自动记录的表单提交时间，只读不可手动修改。",
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
