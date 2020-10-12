# Prometheus Notes: Creating and Managing Cloud Native Services in Kubernetes

## Installing Prometheus and Grafana with Helm

Prometheus and Grafana can be complicated to install. It's also very ueful to use the Prometheus Operator when using
Prometheus with Kubernetes since it supplies useful customer resources such as `ServiceMonitor` which will make configuring
Prometheus much simpler. There are a few different ways to install the Prometheus Operator including:

- Just installing the Prometheus Operator
- Using `prometheus-kube`
- Using the Prometheus Operator Helm Chart

For simplicity I've chosen to use the Prometheus Operator Helm Chart. This install some useful defaults. When using this
in production you'll want to customize much more than has been done here. Here is the command to install the Prometheus
Operator into it's own `monitoring` namespace:

```
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm install prom stable/prometheus-operator --namespace monitoring

```

Once this has been installed, `ServiceMonitors` can be added into the `monitoring` namespace for additional services
that Prometheus will scrape. These have been added to `k8s/manifests/monitoring.yaml`.
