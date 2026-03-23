FROM node:20-alpine AS build

ENV PORT=81
ENV NODE_OPTIONS="--max-old-space-size=1024"

ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_3d88o59
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_3waq3ft
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=oi7dThmhc3iQCpjmH

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]


# docker build  --no-cache -t 192.168.13.72:5000/yuvaq_portfolio_new_23032026 .      
# docker run -d --name yuvaq_portfolio_new_23032026 -p 81:81 yuvaq_portfolio_new_23032026_image

# docker tag yuvaq_portfolio_new_23032026_image 192.168.13.72:5000/yuvaq_portfolio_new_23032026
# docker push 192.168.13.72:5000/yuvaq_portfolio_new_23032026
# docker pull 192.168.13.72:5000/yuvaq_portfolio_new_23032026
# docker run -d --name yuvaq_portfolio_new_23032026 -p 81:81 192.168.13.72:5000/yuvaq_portfolio_new_23032026


# docker pull 192.168.13.72:5000/rrcomplaint_frontend
# docker run -d --name rrcomplaint_frontend -p 8003:80 192.168.13.72:5000/rrcomplaint_frontend