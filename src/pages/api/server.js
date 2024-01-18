import { exec } from 'child_process';

export default function handler(req, res) {
    const { py_name, message } = req.body
    const timeout = setTimeout(() => {
    res.status(450).json({ error: 'Request timed out' });
    }, 50000);
    const base64Message = Buffer.from(message).toString('base64');
    exec(`set PYTHONIOENCODING=utf-8 && C:/Users/anti7/anaconda3/python.exe ${py_name}.py "${base64Message}"`, (error, stdout, stderr) => {
    clearTimeout(timeout); // 清除超时计时器
    if (error) {
      console.error(`执行出错: ${error}`);
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ stdout, stderr });
  });
}